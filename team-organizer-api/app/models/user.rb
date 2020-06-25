class User < ApplicationRecord
    has_many :events
    belongs_to :team, optional:true
    belongs_to :event, optional:true
end
