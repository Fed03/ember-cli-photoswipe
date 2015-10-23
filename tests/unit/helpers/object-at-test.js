import { objectAt } from '../../../helpers/object-at';
import { module, test } from 'qunit';
import Ember from "ember";

module('Unit | Helper | object at');

// Replace this with your real tests.
test('it works', function(assert) {
  var array = Ember.A([
    'foo', 'bar'
  ]);
  var result = objectAt([array, 1]);
  assert.equal(result, 'bar');
});
