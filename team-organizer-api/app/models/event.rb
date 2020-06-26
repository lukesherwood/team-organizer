class Event < ApplicationRecord
    has_many :players, through: :event_users, foreign_key: "user_id"
    belongs_to :creator, class_name: "User", foreign_key: "creator_id"
    belongs_to :team
end
