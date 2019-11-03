class Staff < ApplicationRecord
  belongs_to :user, dependent: :destroy
  has_many :casenotes
  has_many :paperworks

  delegate :first_name, to: :user
  delegate :last_name, to: :user
  delegate :email, to: :user
  delegate :full_name, to: :user

  rails_admin do
    parent User
    weight -1
    object_label_method do
      :cond_full_name
    end
    list do
      field :email
      field :user
      field :casenotes
      field :paperworks
      field :created_at
      field :updated_at
    end
    edit do
      group :default do
        label 'Staff Information'
        field :user
        field :casenotes
        field :paperworks
      end
    end
  end

  def cond_full_name
    full_name unless user.nil?
  end
end
