-- Replicate
replicate' :: Int -> a -> [a]
replicate' n x = [x | _ <- [0..(n - 1)]]

-- Perfects
factors :: Int -> [Int]
factors x = [n | n <- [1..x], x `mod` n == 0]

perfects :: Int -> [Int]
perfects x = [n | n <- [1..x], sum(init (factors n)) == n]

-- Positions
find :: Eq a => a -> [(a,b)] -> [b]
find x xs = [ i | (x', i) <- xs, x == x' ]

positions :: Eq a => a -> [a] -> [Int]
positions x xs = [ i | i <- find x (zip xs [0..n])]
                 where n = length xs - 1

-- Scalarproduct
scalarproduct :: [Int] -> [Int] -> Int
scalarproduct xs ys = sum [ x * y | (x, y) <- zip xs ys]
