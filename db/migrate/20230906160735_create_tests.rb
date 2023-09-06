class CreateTests < ActiveRecord::Migration[6.1]
  def change
    create_table :tests do |t|
      t.integer :student_id
      t.integer :score
      t.integer :version
      t.string :items, array: true, default: []

      t.timestamps
    end
  end
end
