class CreatePermissions < ActiveRecord::Migration[5.0]
  def change
    create_table :permissions do |t|
      t.integer :metric_unit_id
      t.integer :user_id

      t.timestamps
    end
  end
end
