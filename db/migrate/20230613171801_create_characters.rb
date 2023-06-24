class CreateCharacters < ActiveRecord::Migration[6.1]
  def change
    create_table :characters do |t|
      t.string :simplified
      t.string :traditional
      t.integer :hsk_level
      t.integer :appeared, default: 0
      t.integer :correct, default: 0
      t.string :pinyin, array:true, null:false, default: []
      t.string :choices, array:true, null: false, default: ["", "", "", ""]
      t.boolean :checked, default:false
      t.integer :components, default: 0
      t.integer :strokes, default: 0
      t.json :incorrect, null:false, default: {}

      t.timestamps
    end
  end
end
