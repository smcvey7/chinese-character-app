class CreateTableTests < ActiveRecord::Migration[6.1]
  def change
    create_table :tests do |t|
      t.integer :student_id
      t.integer :score
      t.integer :version
      t.jsonb :items, default: [], array: true, null: false
      t.boolean :complete
      t.integer :char_num

      t.timestamps
    end
  end
end
