1.
putStr' :: String -> IO ()
putStr' xs = sequence_ [putChar x | x <- xs] -- build a list of putChar actions & evaluate with sequence_

2. 
charThree :: IO() -> (Char,Char)
charThree = do x <- getChar
               y <- getChar
               z <- getChar
               return (x,z)
