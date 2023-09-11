class AddCharNumToTests < ActiveRecord::Migration[6.1]
  def change
    add_column :tests, :char_num, :int, default: 0
  end
end
