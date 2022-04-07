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

unittest_find_0 = "find -> some results" ~: find 'b' [('a',1),('b',2),('c',3),('b',4)] ~?= [2,4]
unittest_find_1 = "find -> empty" ~: find 'd' [('a',1),('b',2),('c',3),('b',4)] ~?= []


prop_positions' x xs = length xs > 0 ==> positions x xs == positions' x xs
        where types = (x :: Int, xs :: [Int])

-- 7. scalar product:
scalarproduct :: [Int] -> [Int] -> Int
scalarproduct xs ys = sum [x * y | (x,y) <- zip xs ys]

unittest_scalarproduct = "scalarproduct" ~: scalarproduct [1,2,3] [4,5,6] ~?= 32


unittests = Test.HUnit.test [
     unittest_perfects
    ,unittest_5
    ,unittest_find_0
    ,unittest_find_1
    ,unittest_scalarproduct
    ]

runtests = do runTestTT unittests
              quickCheckWith stdArgs {maxSuccess=7} prop_replicate'
              quickCheckWith stdArgs {maxSuccess=7} prop_replicate''
              quickCheckWith stdArgs {maxSuccess=7} prop_pyths

