class Permission < ApplicationRecord
  belongs_to :metric
  belongs_to :user
end
