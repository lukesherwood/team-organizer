class Event < ApplicationRecord
    has_many :users
    belongs_to :creator, class_name: "User", foreign_key: "creator_id"
    belongs_to :team
end
