class Team < ApplicationRecord
    has_many :users, dependent: :destroy
    has_many :events, dependent: :destroy
    accepts_nested_attributes_for :events
end
