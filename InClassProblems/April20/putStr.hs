putStr' :: String -> IO ()
putStr' xs = sequence_ [putChar x | x <- xs] -- build a list of putChar actions & evaluate with sequence_
