#include <iostream>
#include <list>
#include <stdexcept>
#include <string>
#include <unordered_map>

using namespace std;

class Cache {
private:
    using Entry = pair<string, int>;
    using CacheList = list<Entry>;
    using Iterator = CacheList::iterator;

    size_t capacity;

    // Front = Most Recently Used (MRU)
    // Back  = Least Recently Used (LRU)
    CacheList cache;

    // Maps key to its position in the list.
    // Provides O(1) average-time lookup.
    unordered_map<string, Iterator> cacheMap;

public:
    explicit Cache(size_t capacity) : capacity(capacity) {
        if (capacity == 0) {
            throw invalid_argument("Capacity must be positive.");
        }
    }

    // Returns the value if the key exists.
    // Returns -1 otherwise.
    int get(const string& key) {
        auto it = cacheMap.find(key);

        if (it == cacheMap.end()) {
            return -1;
        }

        Iterator listIt = it->second;
        int value = listIt->second;

        // Accessed key becomes the Most Recently Used.
        cache.splice(cache.begin(), cache, listIt);

        return value;
    }

    // Inserts a new key/value or updates an existing key.
    void put(const string& key, int value) {
        auto it = cacheMap.find(key);

        // Key already exists.
        if (it != cacheMap.end()) {
            Iterator listIt = it->second;

            // Update value.
            listIt->second = value;

            // Updated key becomes MRU.
            cache.splice(cache.begin(), cache, listIt);

            return;
        }

        // Insert new entry at the front (MRU).
        cache.emplace_front(key, value);

        // Store its iterator in the hash map.
        cacheMap[key] = cache.begin();

        // Remove LRU if capacity is exceeded.
        if (cache.size() > capacity) {
            Iterator lru = prev(cache.end());

            cout << "\n[LRU EVICTION] Removed key: "
                 << lru->first << '\n';

            cacheMap.erase(lru->first);
            cache.pop_back();
        }
    }

    // Display cache from MRU to LRU.
    void display() const {
        cout << "\nCurrent Cache State:\n";
        cout << "MRU -> LRU\n";
        cout << "-------------------------\n";

        if (cache.empty()) {
            cout << "Cache is empty.\n";
        } else {
            bool first = true;

            for (const auto& [key, value] : cache) {
                if (!first) {
                    cout << " -> ";
                }

                cout << "[" << key << " : " << value << "]";
                first = false;
            }

            cout << '\n';
        }

        cout << "-------------------------\n";
    }
};

// Display interactive menu.
void showMenu() {
    cout << "\n========================================\n";
    cout << "              LRU CACHE\n";
    cout << "========================================\n";
    cout << "1. Put (insert/update)\n";
    cout << "2. Get (retrieve)\n";
    cout << "3. Display cache\n";
    cout << "4. Exit\n";
    cout << "========================================\n";
    cout << "Enter your choice: ";
}

int main() {
    cout << "========================================\n";
    cout << "       LEAST RECENTLY USED CACHE\n";
    cout << "========================================\n\n";

    size_t capacity;

    // Get cache capacity.
    while (true) {
        cout << "Enter cache capacity (positive integer): ";

        if (cin >> capacity && capacity > 0) {
            break;
        }

        cout << "Invalid capacity. "
             << "Please enter a positive integer.\n";

        cin.clear();
        cin.ignore(10000, '\n');
    }

    Cache cache(capacity);

    cout << "\nCache created successfully with capacity: "
         << capacity << "\n";

    cout << "\nGuide:\n";
    cout << "1. PUT    - Insert or update a key/value.\n";
    cout << "2. GET    - Retrieve a value and make it MRU.\n";
    cout << "3. DISPLAY - Show cache order from MRU to LRU.\n";
    cout << "4. EXIT   - Close the program.\n";
    cout << "\nWhen capacity is exceeded, the LRU entry is removed.\n";

    while (true) {
        showMenu();

        int choice;
        cin >> choice;

        if (cin.fail()) {
            cout << "\nInvalid input. "
                 << "Please enter 1, 2, 3, or 4.\n";

            cin.clear();
            cin.ignore(10000, '\n');

            continue;
        }

        // PUT
        if (choice == 1) {
            string key;
            int value;

            cout << "\nEnter key: ";
            cin >> key;

            cout << "Enter value: ";

            if (!(cin >> value)) {
                cout << "Invalid value. Please enter an integer.\n";

                cin.clear();
                cin.ignore(10000, '\n');

                continue;
            }

            cache.put(key, value);

            cout << "\n[SUCCESS] put(\""
                 << key << "\", " << value << ")\n";

            cache.display();
        }

        // GET
        else if (choice == 2) {
            string key;

            cout << "\nEnter key: ";
            cin >> key;

            int result = cache.get(key);

            if (result == -1) {
                cout << "\n[NOT FOUND] get(\""
                     << key << "\") -> -1\n";
            } else {
                cout << "\n[SUCCESS] get(\""
                     << key << "\") -> "
                     << result << '\n';
            }

            cache.display();
        }

        // DISPLAY
        else if (choice == 3) {
            cache.display();
        }

        // EXIT
        else if (choice == 4) {
            cout << "\nThank you for using the LRU Cache.\n";
            cout << "Program terminated successfully.\n";
            break;
        }

        // INVALID MENU OPTION
        else {
            cout << "\nInvalid choice. "
                 << "Please select 1, 2, 3, or 4.\n";
        }
    }

    return 0;
}