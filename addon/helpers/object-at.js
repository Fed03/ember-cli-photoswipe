import Ember from 'ember';

export function objectAt(params/*, hash*/) {
  const [array, index] = params;

  return array.objectAt(index);
}

export default Ember.Helper.helper(objectAt);
