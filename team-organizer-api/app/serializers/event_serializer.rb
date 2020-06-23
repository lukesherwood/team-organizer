class EventSerializer < ActiveModel::Serializer
  attributes :id, :name, :start_time, :end_time, :description, :location, :creator_id
end
