+function($) {
    "use strict";
    function transitionEnd() {
        var el = document.createElement("bootstrap"), transEndEventNames = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd otransitionend",
            transition: "transitionend"
        };
        for (var name in transEndEventNames) if (void 0 !== el.style[name]) return {
            end: transEndEventNames[name]
        };
    }
    $.fn.emulateTransitionEnd = function(duration) {
        var called = !1, $el = this;
        $(this).one($.support.transition.end, function() {
            called = !0;
        });
        var callback = function() {
            called || $($el).trigger($.support.transition.end);
        };
        return setTimeout(callback, duration), this;
    }, $(function() {
        $.support.transition = transitionEnd();
    });
}(window.jQuery), +function($) {
    "use strict";
    var Tab = function(element) {
        this.element = $(element);
    };
    Tab.prototype.show = function() {
        var $this = this.element, $ul = $this.closest("ul:not(.dropdown-menu)"), selector = $this.attr("data-target");
        if (selector || (selector = $this.attr("href"), selector = selector && selector.replace(/.*(?=#[^\s]*$)/, "")), 
        !$this.parent("li").hasClass("active")) {
            var previous = $ul.find(".active:last a")[0], e = $.Event("show.bs.tab", {
                relatedTarget: previous
            });
            if ($this.trigger(e), !e.isDefaultPrevented()) {
                var $target = $(selector);
                this.activate($this.parent("li"), $ul), this.activate($target, $target.parent(), function() {
                    $this.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: previous
                    });
                });
            }
        }
    }, Tab.prototype.activate = function(element, container, callback) {
        function next() {
            $active.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"), 
            element.addClass("active"), transition ? (element[0].offsetWidth, element.addClass("in")) : element.removeClass("fade"), 
            element.parent(".dropdown-menu") && element.closest("li.dropdown").addClass("active"), 
            callback && callback();
        }
        var $active = container.find("> .active"), transition = callback && $.support.transition && $active.hasClass("fade");
        transition ? $active.one($.support.transition.end, next).emulateTransitionEnd(150) : next(), 
        $active.removeClass("in");
    };
    var old = $.fn.tab;
    $.fn.tab = function(option) {
        return this.each(function() {
            var $this = $(this), data = $this.data("bs.tab");
            data || $this.data("bs.tab", data = new Tab(this)), "string" == typeof option && data[option]();
        });
    }, $.fn.tab.Constructor = Tab, $.fn.tab.noConflict = function() {
        return $.fn.tab = old, this;
    }, $(document).on("click.bs.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function(e) {
        e.preventDefault(), $(this).tab("show");
    });
}(window.jQuery), +function($) {
    "use strict";
    var Affix = function(element, options) {
        this.options = $.extend({}, Affix.DEFAULTS, options), this.$window = $(window).on("scroll.bs.affix.data-api", $.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", $.proxy(this.checkPositionWithEventLoop, this)), 
        this.$element = $(element), this.affixed = this.unpin = null, this.checkPosition();
    };
    Affix.RESET = "affix affix-top affix-bottom", Affix.DEFAULTS = {
        offset: 0
    }, Affix.prototype.checkPositionWithEventLoop = function() {
        setTimeout($.proxy(this.checkPosition, this), 1);
    }, Affix.prototype.checkPosition = function() {
        if (this.$element.is(":visible")) {
            var scrollHeight = $(document).height(), scrollTop = this.$window.scrollTop(), position = this.$element.offset(), offset = this.options.offset, offsetTop = offset.top, offsetBottom = offset.bottom;
            "object" != typeof offset && (offsetBottom = offsetTop = offset), "function" == typeof offsetTop && (offsetTop = offset.top()), 
            "function" == typeof offsetBottom && (offsetBottom = offset.bottom());
            var affix = null != this.unpin && scrollTop + this.unpin <= position.top ? !1 : null != offsetBottom && position.top + this.$element.height() >= scrollHeight - offsetBottom ? "bottom" : null != offsetTop && offsetTop >= scrollTop ? "top" : !1;
            this.affixed !== affix && (this.unpin && this.$element.css("top", ""), this.affixed = affix, 
            this.unpin = "bottom" == affix ? position.top - scrollTop : null, this.$element.removeClass(Affix.RESET).addClass("affix" + (affix ? "-" + affix : "")), 
            "bottom" == affix && this.$element.offset({
                top: document.body.offsetHeight - offsetBottom - this.$element.height()
            }));
        }
    };
    var old = $.fn.affix;
    $.fn.affix = function(option) {
        return this.each(function() {
            var $this = $(this), data = $this.data("bs.affix"), options = "object" == typeof option && option;
            data || $this.data("bs.affix", data = new Affix(this, options)), "string" == typeof option && data[option]();
        });
    }, $.fn.affix.Constructor = Affix, $.fn.affix.noConflict = function() {
        return $.fn.affix = old, this;
    }, $(window).on("load", function() {
        $('[data-spy="affix"]').each(function() {
            var $spy = $(this), data = $spy.data();
            data.offset = data.offset || {}, data.offsetBottom && (data.offset.bottom = data.offsetBottom), 
            data.offsetTop && (data.offset.top = data.offsetTop), $spy.affix(data);
        });
    });
}(window.jQuery), +function($) {
    "use strict";
    var Collapse = function(element, options) {
        this.$element = $(element), this.options = $.extend({}, Collapse.DEFAULTS, options), 
        this.transitioning = null, this.options.parent && (this.$parent = $(this.options.parent)), 
        this.options.toggle && this.toggle();
    };
    Collapse.DEFAULTS = {
        toggle: !0
    }, Collapse.prototype.dimension = function() {
        var hasWidth = this.$element.hasClass("width");
        return hasWidth ? "width" : "height";
    }, Collapse.prototype.show = function() {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var startEvent = $.Event("show.bs.collapse");
            if (this.$element.trigger(startEvent), !startEvent.isDefaultPrevented()) {
                var actives = this.$parent && this.$parent.find("> .panel > .in");
                if (actives && actives.length) {
                    var hasData = actives.data("bs.collapse");
                    if (hasData && hasData.transitioning) return;
                    actives.collapse("hide"), hasData || actives.data("bs.collapse", null);
                }
                var dimension = this.dimension();
                this.$element.removeClass("collapse").addClass("collapsing")[dimension](0), this.transitioning = 1;
                var complete = function() {
                    this.$element.removeClass("collapsing").addClass("in")[dimension]("auto"), this.transitioning = 0, 
                    this.$element.trigger("shown.bs.collapse");
                };
                if (!$.support.transition) return complete.call(this);
                var scrollSize = $.camelCase([ "scroll", dimension ].join("-"));
                this.$element.one($.support.transition.end, $.proxy(complete, this)).emulateTransitionEnd(350)[dimension](this.$element[0][scrollSize]);
            }
        }
    }, Collapse.prototype.hide = function() {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var startEvent = $.Event("hide.bs.collapse");
            if (this.$element.trigger(startEvent), !startEvent.isDefaultPrevented()) {
                var dimension = this.dimension();
                this.$element[dimension](this.$element[dimension]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"), 
                this.transitioning = 1;
                var complete = function() {
                    this.transitioning = 0, this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse");
                };
                return $.support.transition ? (this.$element[dimension](0).one($.support.transition.end, $.proxy(complete, this)).emulateTransitionEnd(350), 
                void 0) : complete.call(this);
            }
        }
    }, Collapse.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide" : "show"]();
    };
    var old = $.fn.collapse;
    $.fn.collapse = function(option) {
        return this.each(function() {
            var $this = $(this), data = $this.data("bs.collapse"), options = $.extend({}, Collapse.DEFAULTS, $this.data(), "object" == typeof option && option);
            data || $this.data("bs.collapse", data = new Collapse(this, options)), "string" == typeof option && data[option]();
        });
    }, $.fn.collapse.Constructor = Collapse, $.fn.collapse.noConflict = function() {
        return $.fn.collapse = old, this;
    }, $(document).on("click.bs.collapse.data-api", "[data-toggle=collapse]", function(e) {
        var href, $this = $(this), target = $this.attr("data-target") || e.preventDefault() || (href = $this.attr("href")) && href.replace(/.*(?=#[^\s]+$)/, ""), $target = $(target), data = $target.data("bs.collapse"), option = data ? "toggle" : $this.data(), parent = $this.attr("data-parent"), $parent = parent && $(parent);
        data && data.transitioning || ($parent && $parent.find('[data-toggle=collapse][data-parent="' + parent + '"]').not($this).addClass("collapsed"), 
        $this[$target.hasClass("in") ? "addClass" : "removeClass"]("collapsed")), $target.collapse(option);
    });
}(window.jQuery);