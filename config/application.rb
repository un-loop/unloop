require_relative 'boot'

require "rails"
# Pick the frameworks you want:
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
require "active_storage/engine"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_mailbox/engine"
require "action_text/engine"
require "action_view/railtie"
require "action_cable/engine"
require "sprockets/railtie"
# require "rails/test_unit/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Unloop
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 6.0

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.

    # Don't generate system test files.
    config.generators.system_tests = nil
    config.react.camelize_props = true

    # For Sentry (Bug Tracking)
    if Rails.env.production? ||  Rails.env.staging?
      Raven.configure do |config|
        config.dsn = 'https://410fe9b979f04fb48c9c83b6643bff7e@sentry.io/5189754'
        config.environments = ['staging', 'production']
        Raven.user_context(
          email: current_user.email,
          first_name: current_user.first_name,
          last_name: current_user.last_name,
          user_type: current_user.user_type,
          admin: current_user.admin,
          provider: current_user.provider,
          uid: current_user.uid
        )
      end
    end
  end
end
