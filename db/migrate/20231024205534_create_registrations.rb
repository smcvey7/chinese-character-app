class CreateRegistrations < ActiveRecord::Migration[6.1]
  def change
    create_table :registrations do |t|
      t.integer :class_group_id
      t.integer :student_id

      t.timestamps
    end
  end
end
