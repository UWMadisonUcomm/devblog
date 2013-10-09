# Jekyll plugin for generating archive pages for tags and categories
# No config. Assumes: layout archives_page.html exists. Creates tag and category dirs.
# Creates subdirs of category or tag name
# returns page object with: title, header, posts

module Jekyll

  class TaxonomyPage < Page
    def initialize(site, base, dir, obj, type)
      @site = site
      @base = base
      @dir = dir
      @name = 'index.html'

      page_data = case type
              when 'tag'
                {
                  :posts => site.tags[obj],
                  :page_title_prefix => 'Tag: '
                }
              when 'category'
                {
                  :posts => site.categories[obj],
                  :page_title_prefix => 'Category: '
                }
              end

      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), 'archive_page.html')

      self.data['posts'] = page_data[:posts]
      prefix = page_data[:page_title_prefix]
      self.data['header'] = "#{prefix}#{obj}"

      self.data['title'] = "#{self.data['header']}: "
    end
  end

  class TaxonomyPageGenerator < Generator
    safe true

    def generate(site)
      if site.layouts.key? 'archive_page'
        dir = site.config["category_dir"] || 'category'
        site.categories.keys.each do |category|
          site.pages << TaxonomyPage.new(site, site.source, File.join(dir, category), category, 'category')
        end

        dir = site.config["tag_dir"] || 'tag'
        site.tags.keys.each do |tag|
          site.pages << TaxonomyPage.new(site, site.source, File.join(dir, tag), tag, 'tag')
        end
      end
    end
  end

end