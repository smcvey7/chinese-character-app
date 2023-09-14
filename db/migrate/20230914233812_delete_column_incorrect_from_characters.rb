class DeleteColumnIncorrectFromCharacters < ActiveRecord::Migration[6.1]
  def change
    remove_column :characters, :incorrect
  end
end
