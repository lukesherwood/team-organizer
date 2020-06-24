class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :name
      t.string :email
      t.string :phone_number
      t.integer :team_id
      t.integer :event_id
      t.timestamps
    end
  end
end
