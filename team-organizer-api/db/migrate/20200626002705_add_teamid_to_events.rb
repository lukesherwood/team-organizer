class AddTeamidToEvents < ActiveRecord::Migration[6.0]
  def change
    add_column :events, :team_id, :integer
  end
end
