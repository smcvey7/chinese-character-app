class AddColumnIncorrectToCharacters < ActiveRecord::Migration[6.1]
  def change
    add_column :characters, :incorrect, :integer, array: true, default: [], null: false
  end
end
