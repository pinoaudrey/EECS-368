prop_Index_v4 :: (NonEmptyList Integer) -> Property
prop_Index_v4 (NonEmpty xs) =
forAll (choose (0, length xs-1)) $ \n -> xs !! n == head (drop n xs)

1. If the length of xs is 3, the values that QuickCheck choose from, to test prop_Index_v4 are from 0 to 2.

2. 
[2,1,2,1,0]

3. 
RHS: xs !! 0 = 1
LHS: head(drop 0 xs)
     = head([1,2,3])
     = 1
RHS = 1
LHS = 1
RHS = LHS, 1 == 1, True
     
RHS: xs !! 1 = 2
LHS: head(drop 1 xs)
     = head([2,3])
     = 2
RHS = 2
LHS = 2
RHS = LHS, 2 == 2, True

RHS: xs !! 2 = 3
LHS: head(drop 2 xs)
     = head([3])
     = 3
RHS = 3
LHS = 3
RHS = LHS, 3 == 3, True
