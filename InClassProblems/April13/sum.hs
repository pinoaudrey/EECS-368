
{-
sum
1. define the type
sum :: [Int] -> Int
2. enumerate the cases
sum []
sum [x]
sum [x, y]
sum (x : xs)
3. define the simple cases
sum []       = 0
sum [x]      = x
sum [x, y]   = x + y
sum (x : xs) = ...
4. define other cases
sum []       = 0
sum [x]      = x
sum [x, y]   = x + y
sum (x : xs) = x + sum xs
5. generalize and simplify
sum []       = 0
sum (x : xs) = x + sum xs
-}

sum :: [Int] -> Int
sum []       = 0
sum (x : xs) = x + sum xs
-}
