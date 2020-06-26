class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :phone_number, :team_id
  has_many :events
  belongs_to :team
  has_many :events, through: :event_users
end
