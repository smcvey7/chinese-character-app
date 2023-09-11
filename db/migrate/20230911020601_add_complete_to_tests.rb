class AddCompleteToTests < ActiveRecord::Migration[6.1]
  def change
    add_column :tests, :complete, :boolean, default: false
  end
end
