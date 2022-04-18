-- Replicate
-- creates a list of length given by the first argument and the items having value of the second argument
replicate :: Int -> a -> [a]
replicate n x = [x | _ <- [0..(n - 1)]]

-- Perfects
-- defines a function that maps a positive integer to its list of factors using a guard
factors :: Int -> [Int]
factors x = [n | n <- [1..x], x `mod` n == 0]
-- defines a function that decides if a number is perfect using factors
-- a positive integer is perfect if it equals the sum of all of its factors, excluding the number itself
-- defines a function that returns the list of all perfects up to a given limit using a guard
perfects :: Int -> [Int]
perfects x = [n | n <- [1..x], sum(init (factors n)) == n]

-- Positions
--  defines a function that takes a predicate and a list &
-- returns the first element in the list matching the predicate, or Nothing if there is no such element
find :: Eq a => a -> [(a,b)] -> [b]
find x xs = [ i | (x', i) <- xs, x == x' ]

-- defines a function that returns the list of all positions of a value in a list using zip
positions :: Eq a => a -> [a] -> [Int]
positions x xs = [ i | i <- find x (zip xs [0..n])]
                 where n = length xs - 1

-- Scalarproduct
-- defines a function that returns the sum of the product of two lists of integers xs and ys of length n using zip
scalarproduct :: [Int] -> [Int] -> Int
scalarproduct xs ys = sum [ x * y | (x, y) <- zip xs ys]
