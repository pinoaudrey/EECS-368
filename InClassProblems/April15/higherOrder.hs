-- 1. Express the following list comprehension using the functions map and filter: [f x | x <- xs, p x]
func f p xs = map f (filter p xs)

--2. Redefine map f using foldr.
map'' :: (a -> b) -> [a] -> [b]
map'' f = foldr (\x xs -> f x : xs) []


--3. Redefine filter p using foldr.
filter'' :: (a -> Bool) -> [a] -> [a]
filter'' f = foldr (\x xs -> if (f x) then x : xs else xs) []
