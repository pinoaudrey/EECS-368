class Group
{
    constructor()// constructor to initialize an empty Group
    {
        this.elements = []; // create an empty array
    }

    has(value) // boolean has method, returns true if argument is a member of the group, or false if it is not
    {
        for(var i=0;i<this.elements.length;i++) // loops through array of elements
        {
            if(this.elements[i] === value) // returns true if argument is a member of the group
                return true;
        }
        return false; // returns false if argument is not a member of the group
    }

    add(value) //add method that adds a value to the group
    {
        if(!this.has(value)) // checks to make sure the value isnt already in the group
            this.elements.push(value); // adds value to the array of elements
    }

    delete(value) //delete method that deletes a value from the group
    {
        for(var i=0;i<this.elements.length;i++) // loops through array of elements
        {
            if(this.elements[i] === value) // checks array for value at index i
            {
                this.elements[i] = this.elements[this.elements.length-1]; // replaces value at index i with the last element in the array
                this.elements.pop(); // deletes/removes the last element of the array
            }
        }
    }

    union(otherGroup) // union method that returns the union of the group and argument(otherGroup)
    {
        let unionGroup = new Group(); // create empty group to store the union

        for(var i=0;i<this.elements.length;i++) // loop that uses add method to add elements of this group to unionGroup
            unionGroup.add(this.elements[i]);

        for(var i=0;i<otherGroup.elements.length;i++) // loop that uses add method to add elements of otherGroup to unionGroup
            unionGroup.add(otherGroup.elements[i]);

        return unionGroup; // returns the union of the group and argument(otherGroup)
    }

    intersection(otherGroup) // intersection method that returns the intersection of the group and argument(otherGroup)
    {
        let intersectionGroup = new Group(); // create empty group to store the intersection

        for(var i=0;i<this.elements.length;i++) // loops through array of elements of this group
        {
            if(otherGroup.has(this.elements[i])) // checks if element at index i is in otherGroup, if so, adds element to intersectionGroup
                intersectionGroup.add(this.elements[i]);
        }
        return intersectionGroup;
    }

    difference(otherGroup) // difference method that returns the difference of the group and argument(otherGroup)
    {
        let differenceGroup = new Group(); // create empty group to store the difference

        for(var i=0;i<this.elements.length;i++) // loops through array of elements of this group
        {
            if(!otherGroup.has(this.elements[i])) // // checks if element at index i is in otherGroup, if not, adds element to differenceGroup
                differenceGroup.add(this.elements[i]);
        }
        return differenceGroup;
    }
} // end Group class

// test Group class with following code
let group1 = new Group();
let group2 = new Group();

group1.add(1);
group1.add(2);
group1.add(3);
console.log(group1);

group2.add(2);
group2.add(3);
group2.add(5);
group2.add(2);
console.log(group2);
console.log(group1.has(5));
console.log(group2.has(3));
console.log(group1.union(group2));
console.log(group1.intersection(group2));
console.log(group1.difference(group2));
group1.delete(1);
console.log(group1);
group2.delete(1);
console.log(group2);
