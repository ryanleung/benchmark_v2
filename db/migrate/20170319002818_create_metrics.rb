class CreateMetrics < ActiveRecord::Migration[5.0]
  def change
    create_table :metrics do |t|
      t.string :metric_name,           null: false
      t.integer :metric_type_id,       null: false
      t.string :function
      t.integer :user_id
      t.integer :company_id,           null: false
      t.integer :industry_id,          null: false
      t.integer :business_unit_id
      t.float :value,                  null: false
      t.string :value_description
      t.string :geo
      t.date :relevant_date

      t.timestamps
    end
    add_index :metrics, :metric_name
    add_index :metrics, :metric_type_id
    add_index :metrics, :function
    add_index :metrics, :user_id
    add_index :metrics, :company_id
    add_index :metrics, :industry_id
  end
end
