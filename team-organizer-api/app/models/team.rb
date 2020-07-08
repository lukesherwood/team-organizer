class Team < ApplicationRecord
    has_many :users
    has_many :events
    accepts_nested_attributes_for :events
end
