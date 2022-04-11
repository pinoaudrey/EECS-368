{-
Using the five-step process construct the library function that calculates the sumof a list of numbers listing each step:

•Step 1: Define the type
sum :: [Int] -> Int

•Step 2: Enumerate the cases
sum []
sum [x]
sum [x, y]
sum (x : xs)

•Step 3: Define the simple cases
sum []       = 0
sum [x]      = x
sum [x, y]   = x + y
sum (x : xs) = ...

•Step 4: Define the other cases
sum []       = 0
sum [x]      = x
sum [x, y]   = x + y
sum (x : xs) = x + sum xs

•Step 5: Generalize and simplify
sum []       = 0
sum (x : xs) = x + sum xs

Final Function| library function that calculates the sumof a list of numbers listing each step: -}

sum :: [Int] -> Int
sum []       = 0
sum (x : xs) = x + sum xs
