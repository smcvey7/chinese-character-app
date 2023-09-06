class CreateClassGroups < ActiveRecord::Migration[6.1]
  def change
    create_table :class_groups do |t|
      t.string :name
      t.integer :teacher_id
      t.integer :uuid
      t.integer :level

      t.timestamps
    end
  end
end
