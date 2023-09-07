class RemoveColumnStateFromTeachers < ActiveRecord::Migration[6.1]
  def change
    remove_column :teachers, :state, :string
  end
end
