class Event < ApplicationRecord
    has_many :event_users, dependent: :destroy
    has_many :players, through: :event_users, source: :user, dependent: :destroy
    belongs_to :creator, class_name: "User", foreign_key: "creator_id"
    belongs_to :team
end
