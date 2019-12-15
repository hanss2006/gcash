<?php

/**
 * Transform the tree
 *
 * @param $treeArrayGroups
 * @param $rootArray
 * @return mixed
 */
function transformTree($treeArrayGroups, $rootArray)
{
  // Read through all nodes where parent is root array
  foreach ($treeArrayGroups[$rootArray['guid']] as $child) {
    // If there is a group for that child, aka the child has children
    if (isset($treeArrayGroups[$child['guid']])) {
      // Traverse into the child
      $newChild = transformTree($treeArrayGroups, $child);
    } else {
      $newChild = $child;
    }
    // Assign the child to the array of children in the root node
    $rootArray['children'][] = $newChild;
  }
  return $rootArray;
}
