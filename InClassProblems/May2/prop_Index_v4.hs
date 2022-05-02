prop_Index_v4 :: (NonEmptyList Integer) -> Property
prop_Index_v4 (NonEmpty xs) =
forAll (choose (0, length xs-1)) $ \n -> xs !! n == head (drop n xs)

1. If the length of xs is 3, what values will QuickCheck choose from, to test prop_Index_v4.

2. Generate a test list of 5 elements that QuickCheck might generate for Problem No. 1.

3. Let xs = [1,2,3], show prop_Index_v4 is true for each of the values you determined in Problem No. 1. For example, if n = 0, show:
xs !! 0 == head (drop 0 xs)
