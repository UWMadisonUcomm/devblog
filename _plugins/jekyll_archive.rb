# Jekyll plugin for generating archive pages for tags and categories
# No config. Assumes: layout archives_page.html exists. Creates tag and category dirs.
# Creates subdirs of category or tag name
# returns page object with: title, header, posts

module Jekyll

  class ArchivePage < Page
    def initialize(site, base, dir, obj, type)
      @site = site
      @base = base
      @dir = dir
      @name = 'index.html'

      page_data = case type
              when 'tag'
                {
                  :posts => site.tags[obj],
                  :page_title_prefix => site.config["tag_title_prefix"] || 'Tag: '
                }
              when 'category'
                {
                  :posts => site.categories[obj],
                  :page_title_prefix => site.config["category_title_prefix"] || 'Category: '
                }
              end

      layout_file = site.config["archive_layout"].nil? ? 'archive_page.html' : site.config["archive_layout"] + '.html'

      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), layout_file)

      self.data['posts'] = page_data[:posts]
      prefix = page_data[:page_title_prefix]
      self.data['header'] = "#{prefix}#{obj.capitalize }"

      self.data['title'] = "#{self.data['header']}: "
      self.data['archive_page'] = true
    end
  end

  class ArchivePageGenerator < Generator
    safe true

    def generate(site)
      if site.layouts.key? site.config["archive_layout"] || 'archive_page'
        dir = site.config["category_dir_name"] || 'category'
        site.categories.keys.each do |category|
          site.pages << ArchivePage.new(site, site.source, File.join(dir, category), category, 'category')
        end

        dir = site.config["tag_dir_name"] || 'tag'
        site.tags.keys.each do |tag|
          site.pages << ArchivePage.new(site, site.source, File.join(dir, tag), tag, 'tag')
        end
      end
    end
  end

end
