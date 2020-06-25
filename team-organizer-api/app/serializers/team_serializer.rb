class TeamSerializer < ActiveModel::Serializer
  attributes :id, :name, :description
  has_many :users
end
