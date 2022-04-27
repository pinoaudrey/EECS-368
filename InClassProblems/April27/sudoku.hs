{- Evaluate the following functions:
1. prune [[[3],[1,2,4]],[[1,3],[3,4]]]
when the box size is 2, prune removes the 3 from the bottom left and right.
[[[3],[1,2,4]],[[1],[4]]]
2. fix prune [[[5],[6,8]],[[7],[7,8]]]
fix prune removes the 7 from the bottom right box & the 8 from the top right box.
[[[5],[6]],[[7],[8]]]
3. blocked [[[3,4],[],[3]],[[1],[1,2],[1]]]
block returns true as the bottom row is impossible to solve because of duplicates
4. expand [[[1,2],[3]],[[4],[1,2]]]
expand takes the matrix & outputs a tuple of matrices where the first square with more than one choiceis collapsed
([[[1],[3]],[[4],[1,2]]],[[[2],[3]],[4],[1,2]]])
