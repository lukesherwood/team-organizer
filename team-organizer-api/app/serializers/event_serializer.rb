class EventSerializer < ActiveModel::Serializer
  attributes :id, :name, :start_time, :end_time, :description, :location, :creator_id
  has_many :users
  belongs_to :creator, class_name: "User", foreign_key: "creator_id"
  belongs_to :team
end
