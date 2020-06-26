class User < ApplicationRecord
    has_many :events
    belongs_to :team, optional:true
    has_many :event_users
    has_many :events, through: :event_users
end