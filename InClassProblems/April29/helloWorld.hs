Write a Haskell script called HelloWorld.hs that prints “Hello World!” in the following ways:
1. Use one ptrStrLn. Recall: putStrLn :: String -> IO () writes a string and moves to a new line.
main = putStrLn "Hello World!"

    
2. Uses the do function, putStr, and putChar, with the two strings: “Hello” and “World!”.
Recall: putStr :: String -> IO () writes a string without moving to a new line, and putChar :: Char -> IO () writes a single character to the screen.
main = do   putStr "Hello"
            putChar ' '
            putStr "World!"  
3. Uses the do, let, concat, and putStr keywords, with the two strings: “Hello” and “World!\n”.
Recall: concatis a “pure” function that concatenates a list of strings.
main = do
let str1 = "Hello"
let space = " "
let str2 = "World!\n"
let str3 = concat [str1, space, str2]
putStr str3
