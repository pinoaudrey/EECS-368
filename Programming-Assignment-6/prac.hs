-- 2. replicate
replicate' :: Int -> a -> [a]
replicate' n x = [x | _ <- [0..(n - 1)]]

prop_replicate' n x = replicate' n x == replicate n x
    where types = (n :: Int, x :: Int)
    
    -- perfects
perfects :: Int -> [Int]
perfects n | n >= 3 = [x | x <- [3..n], f x]
           | otherwise = error "n must be greater than 2"
    where f x = x == g x
          g = sum . init . factors
          -- or: g x = sum (factors x) - x :: Int -> Bool

-- positions implemented with using 'find'
positions' :: Eq a => a -> [a] -> [Int] 
positions' x xs = find x (zip xs [0..n])
    where n = length xs - 1

prop_positions' x xs = length xs > 0 ==> positions x xs == positions' x xs
        where types = (x :: Int, xs :: [Int])

-- 7. scalar product:
scalarproduct :: [Int] -> [Int] -> Int
scalarproduct xs ys = sum [x * y | (x,y) <- zip xs ys]
