data Tree a = Leaf a | Node (Tree a) (Tree a) 
-- 1. Define a function that returns the number leaves in a tree:
leaves :: Tree a -> Int
leaves (Leaf _) = 1
leaves (Node left right) = leaves left + leaves right

-- 2. Use the leaves function, to define a function that decides if a binary tree is balanced or not.
balanced :: Tree a -> Bool
balanced (Leaf _) = True
balanced (Node left right) = abs (leaves left - leaves right) <= 1 && balanced left && balanced right
