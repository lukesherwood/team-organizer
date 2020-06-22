class CreateEvents < ActiveRecord::Migration[6.0]
  def change
    create_table :events do |t|
      t.string :name
      t.datetime :start_time
      t.datetime :end_time
      t.text :description
      t.integer :creator_id
      t.string :location

      t.timestamps
    end
  end
end
