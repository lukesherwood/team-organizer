class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :phone_number, :team_id
end
