class CreateTeachers < ActiveRecord::Migration[6.1]
  def change
    create_table :teachers do |t|
      t.string :username
      t.string :email
      t.string :password_digest
      t.string :first_name
      t.string :last_name
      t.string :country
      t.string :state
      t.string :school
      t.boolean :admin

      t.timestamps
    end
  end
end
