class CreateJoinTableMetricsUsers < ActiveRecord::Migration[5.0]
  def change
    create_join_table :metrics, :users do |t|
      t.index [:metric_id, :user_id]
      t.index [:user_id, :metric_id]
      t.timestamps null: false
    end
  end
end
